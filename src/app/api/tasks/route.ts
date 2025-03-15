import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();
    await pool.query("INSERT INTO tasks (title, description) VALUES (?, ?)", [
      title,
      description,
    ]);
    return NextResponse.json(
      { message: "Task added successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
}
