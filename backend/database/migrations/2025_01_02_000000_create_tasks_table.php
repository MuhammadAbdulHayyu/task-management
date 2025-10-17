<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id('task_id');
            $table->foreignId('user_id')
                  ->constrained('users', 'user_id')
                  ->onDelete('cascade');

            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('status', ['To Do', 'In Progress', 'Done'])->default('To Do');
            $table->date('deadline')->nullable();
            $table->string('created_by');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
