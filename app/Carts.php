<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carts extends Model
{
    protected $fillable = [
        'user_id', 'product_id'
    ];
}
    