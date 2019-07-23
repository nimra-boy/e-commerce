<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Carts;
use App\Product;
use App\Shipping;


class CartController extends Controller
{
    /**
    * Display result of search.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */

    public function setCart(Request $request)
    {
        error_log('okok: ' . $request);
        $user_id = $request->get('user_id');
        $product_id = $request->get('product_id');

        // error_log($product_id);

        $number = Carts::select('product_id')->where('user_id', $user_id)->get();

        // error_log("okokokok: ". $number);
        $i = 0;
        foreach($number as $value){
            // error_log($value['product_id']);
            if($value['product_id'] == $product_id){
                // error_log("ca existe deja chakal: " . $value['product_id']);
                $i++;
            }
            else{
                // error_log("bien vu bon choix chakal");
            }
        }

        if($i == 0){
            $cart = new Carts([
                'user_id' => $request->get('user_id'),
                'product_id' => $request->get('product_id'),
                ]);
                $cart->save();

            }
            else{
                $cart = Carts::where('product_id', $product_id)->where('user_id', $user_id)->first();
                $cart->increment('number');
            }
            return response()->json('Cart Added Successfully.');
        }

        /**
        * Display result of search.
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\Response
        */

        public function addCart(Request $request)
        {
            error_log($request);

            $user_id = $request->get('user_id');
            $product_id = $request->get('product_id');


            $cart = Carts::where('product_id', $product_id)->where('user_id', $user_id)->first();
            $cart->increment('number');

            return response()->json('Cart Added Successfully.');
        }

        /**
        * Display result of search.
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\Response
        */

        public function removeCart(Request $request)
        {
            error_log($request);

            $user_id = $request->get('user_id');
            $product_id = $request->get('product_id');


            $cart = Carts::where('product_id', $product_id)->where('user_id', $user_id)->first();
            $cart->decrement('number');

            return response()->json('Cart Added Successfully.');
        }

        /**
        * Display result of search.
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\Response
        */

        public function getCart(Request $request)
        {
            error_log($request);
            $id = $request->user_id;

            // error_log("sss ".$id);

            // $cart = Carts::where('user_id', $id)->get();

            $cart =  Product::select('title', 'price', 'saleprice', 'sale', 'discount' , 'stock', 'filename','carts.id','carts.product_id')
            ->join('carts', 'carts.product_id', '=', 'products.id')
            ->where('carts.user_id', $id)
            ->get();

            $shipping = Shipping::all();

            $number = Carts::select('number')
            ->where('user_id', $id)
            ->get();

            error_log($cart);

            return response()->json(['cart' => $cart,'number'=>$number, 'shipping'=>$shipping]);

            //   return response()->json('Cart Added Successfully.');
        }

        /**
        * Remove the specified resource from storage.
        *
        * @param  int  $id
        * @return \Illuminate\Http\Response
        */
        public function deleteCart(Request $request)
        {
            error_log('deeeleeete');
            $id = $request->key;

            $cart = Carts::find($id)->first();
            $cart->delete();
            return response()->json('Cart Deleted Successfully.');
        }

    }
