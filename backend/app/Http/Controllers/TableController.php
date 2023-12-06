<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Table;

class TableController extends Controller
{
    public function index()
    {
        $tables = Table::all();
        return response()->json($tables);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'availability' => 'required|boolean',
            'chairs' => 'required|integer',
        ]);

        $table = Table::create($validatedData);
        return response()->json($table, 201);
    }

    public function show($id)
    {
        $table = Table::findOrFail($id);
        return response()->json($table);
    }

    public function update(Request $request, $id)
    {
        $table = Table::findOrFail($id);

        $validatedData = $request->validate([
            'availability' => 'required|boolean',
            'chairs' => 'required|integer',
        ]);

        $table->update($validatedData);
        return response()->json($table);
    }

    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        $table->delete();
        return response()->json(null, 204);
    }
}
