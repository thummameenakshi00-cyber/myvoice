/*
  # Create practice_sessions table

  ## Summary
  Stores each user's 1-minute speaking practice sessions including the transcript
  and the topic cards that were shown during the session.

  ## New Tables
  - `practice_sessions`
    - `id` (uuid, primary key) — unique session identifier
    - `user_id` (uuid, nullable) — references auth.users; null for anonymous sessions
    - `transcript` (text) — what the user wrote/pasted after speaking
    - `topic_texts` (text[]) — array of topic prompts shown during the session
    - `duration_seconds` (integer) — how long the timer ran (default 60)
    - `created_at` (timestamptz) — when the session was recorded

  ## Security
  - RLS enabled; authenticated users may only read/insert their own rows
  - Anonymous inserts allowed so guests can save without signing in (user_id will be null)
*/

CREATE TABLE IF NOT EXISTS practice_sessions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  transcript       text NOT NULL DEFAULT '',
  topic_texts      text[] NOT NULL DEFAULT '{}',
  duration_seconds integer NOT NULL DEFAULT 60,
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read their own sessions
CREATE POLICY "Authenticated users can view own sessions"
  ON practice_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Anyone (including anon) can insert; user_id will be null for anon
CREATE POLICY "Anyone can insert a practice session"
  ON practice_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL) OR
    (auth.uid() = user_id)
  );

-- Authenticated users can update their own sessions
CREATE POLICY "Authenticated users can update own sessions"
  ON practice_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can delete their own sessions
CREATE POLICY "Authenticated users can delete own sessions"
  ON practice_sessions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
