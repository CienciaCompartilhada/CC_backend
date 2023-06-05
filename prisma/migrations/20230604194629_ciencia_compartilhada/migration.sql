-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "name" INTEGER,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expertise" (
    "id" SERIAL NOT NULL,
    "name" INTEGER,

    CONSTRAINT "expertise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expertise_courses" (
    "id" SERIAL NOT NULL,
    "expertise_id" INTEGER,
    "course_id" INTEGER,

    CONSTRAINT "expertise_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "professor_id" INTEGER,
    "university_id" INTEGER,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university" (
    "id" SERIAL NOT NULL,
    "name" INTEGER,

    CONSTRAINT "university_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_expertise" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "expertise_id" INTEGER,

    CONSTRAINT "user_expertise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_university" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "university_id" INTEGER,

    CONSTRAINT "user_university_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80),
    "email" VARCHAR(80),
    "password" TEXT,
    "is_teacher" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_name_key" ON "course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "expertise_name_key" ON "expertise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "expertise_courses" ADD CONSTRAINT "expertise_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "expertise_courses" ADD CONSTRAINT "expertise_courses_expertise_id_fkey" FOREIGN KEY ("expertise_id") REFERENCES "expertise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "university"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_expertise" ADD CONSTRAINT "user_expertise_expertise_id_fkey" FOREIGN KEY ("expertise_id") REFERENCES "expertise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_expertise" ADD CONSTRAINT "user_expertise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_university" ADD CONSTRAINT "user_university_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "university"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_university" ADD CONSTRAINT "user_university_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
