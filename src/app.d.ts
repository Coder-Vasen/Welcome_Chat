import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
		}
	}
	var __prisma: PrismaClient;
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type UserAttributes = {
			username: string;
		};
	}
}

// THIS IS IMPORTANT!!!
export {};
