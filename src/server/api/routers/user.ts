import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getCollFromEmail } from "@/lib/utils";
import cloudinary from "@/lib/cloudinary";
import { createClerkClient } from '@clerk/nextjs/server'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!existingUser) {
        const csv = await fetch(`https://xpecto.org/allUnivs.csv`)
          .then((res) => res.text())
          .catch((err) => {
            console.error("Error fetching allUnivs.csv:", err);
            return "";
          });

        //TODO: Add registration to all competitions if college is IIT Mandi. Similarly, when a competition is added, add its reg to all IIT Mandi users.
        //TODO: The above can also be achieved by making registration directly go to handleSuccess in the register dialog content if the CurrentUser college name is IITMD
        //TODO: Do any one of the above

        return ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            college_name: getCollFromEmail(input.email, csv),
          },
        });
      } else {
        return existingUser;
      }
    }),

  addToClerk: publicProcedure
  .input(z.object({ clerkId: z.string(), dbId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    try {
      const updatedUser = await clerk.users.updateUser(input.clerkId, {
        externalId: input.dbId,
      });

      return { success: true, updatedUser };
    } catch (error) {
      console.error("Failed to update externalId:", error);
      throw new Error("Failed to update externalId");
    }

  }),

  getUserTeams: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userTeams = await ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          teams: {
            include: {
              leader: true,
              team_members: true,
            },
          },
        },
      });
      return userTeams ? userTeams.teams : [];
    }),

  searchUsers: publicProcedure
    .input(z.object({ query: z.string(), invitees: z.string().array() }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        where: {
          email: {
            contains: input.query,
          },
          id: {
            notIn: input.invitees,
          },
        },
      });
      return users;
    }),

  searchCompUsers: publicProcedure
    .input(
      z.object({
        query: z.string(),
        invitees: z.string().array(),
        competitionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        where: {
          regEvents: {
            some: {
              event: {
                competition: {
                  id: input.competitionId,
                },
              },
            },
          },
          teams: {
            none: {
              competitionId: input.competitionId,
            },
          },
          email: {
            contains: input.query,
          },
          id: {
            notIn: input.invitees,
          },
        },
      });
      return users;
    }),

  deleteUserFromTeam: publicProcedure
    .input(
      z.object({
        teamId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { teamId, userId } = input;

      // Disconnect the user from team_members
      const team = await ctx.db.team.update({
        where: { id: teamId },
        data: {
          team_members: {
            disconnect: { id: userId },
          },
        },
        include: {
          leader: true,
          team_members: true,
        },
      });

      // If the user was the leader, update the leaderId
      if (team.leaderId === userId) {
        if (team.team_members.length > 0) {
          // Set the leaderId to the first person in team_members
          await ctx.db.team.update({
            where: { id: teamId },
            data: {
              leaderId: team.team_members[0]!.id,
            },
          });
        } else {
          // Should delete all sent invitations
          await ctx.db.team.update({
            where: { id: teamId },
            data: {
              invitations: {
                deleteMany: {},
              },
            },
          });
          // If there are no team_members left, delete the team
          await ctx.db.team.delete({
            where: { id: teamId },
          });
          return { message: "Team deleted as there are no members left" };
        }
      }

      return team;
    }),

  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      return user;
    }),
    
  uploadImageToFolder: publicProcedure
    .input(z.object({ base64: z.string(), folderName: z.string() })) // Expect a Base64 image
    .mutation(async ({ input }) => {
      try {
        const result = await cloudinary.uploader.upload(input.base64, {
          folder: input.folderName,
        });

        return {
          success: true,
          publicId: result.public_id,
          url: result.secure_url,
        };
      } catch (error) {
        console.error(error);
        return { success: false, message: "Upload failed" };
      }
    }),

  deleteImage: publicProcedure
    .input(z.object({ publicId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await cloudinary.uploader.destroy(input.publicId);
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false, message: "Deletion failed" };
      }
    }),
});
