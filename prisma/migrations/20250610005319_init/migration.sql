-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('gratuito', 'premium');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FolhaCornell" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "palavras_chave" TEXT[],
    "anotacoes_relevantes" TEXT[],
    "cores_personalizadas" JSONB,

    CONSTRAINT "FolhaCornell_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FolhaCornell" ADD CONSTRAINT "FolhaCornell_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
