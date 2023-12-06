<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bill extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'id_waiter', 'amount', 'price_unit'];

    public function waiter()
    {
        return $this->belongsTo(Waiter::class, 'id_waiter');
    }
}
