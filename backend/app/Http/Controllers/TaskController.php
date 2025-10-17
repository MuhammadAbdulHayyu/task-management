<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::where('user_id', Auth::id());

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $tasks = $query->orderBy('deadline', 'asc')->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'deadline' => 'nullable|date'
        ]);

        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? '',
            'status' => 'To Do',
            'deadline' => $validated['deadline'] ?? null,
            'created_by' => Auth::user()->name,
        ]);

        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);
        $task->update($request->only('title', 'description', 'status', 'deadline'));
        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}
