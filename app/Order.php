<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id','price','name','zip','adress','city','country','delivery'
    ];
}
