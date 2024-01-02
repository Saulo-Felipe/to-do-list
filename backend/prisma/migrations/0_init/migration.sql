-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL DEFAULT 'No name',
    "backgroundColor" VARCHAR(100) NOT NULL DEFAULT '#fff',
    "contentColor" VARCHAR(100) NOT NULL DEFAULT '#000',
    "iconId" VARCHAR(100) NOT NULL DEFAULT 'warning',
    "PkUserId" INTEGER,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(200) NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "categoryID" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

