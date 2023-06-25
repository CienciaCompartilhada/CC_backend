-- CreateIndex
CREATE INDEX "course_id_idx" ON "course"("id");

-- CreateIndex
CREATE INDEX "expertise_id_idx" ON "expertise"("id");

-- CreateIndex
CREATE INDEX "expertise_courses_expertise_id_idx" ON "expertise_courses"("expertise_id");

-- CreateIndex
CREATE INDEX "projects_id_professor_id_expertise_id_idx" ON "projects"("id", "professor_id", "expertise_id");

-- CreateIndex
CREATE INDEX "session_user_id_idx" ON "session"("user_id");

-- CreateIndex
CREATE INDEX "university_id_idx" ON "university"("id");

-- CreateIndex
CREATE INDEX "user_expertise_user_id_idx" ON "user_expertise"("user_id");

-- CreateIndex
CREATE INDEX "user_university_user_id_idx" ON "user_university"("user_id");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");
