import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
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
  } catch (error) {
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    await pool.query("UPDATE tasks SET status = ? WHERE id = ?", [
      status,
      params.id,
    ]);
    return NextResponse.json({ message: "Task updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await pool.query("DELETE FROM tasks WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
