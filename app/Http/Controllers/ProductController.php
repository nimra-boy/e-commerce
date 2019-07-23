<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use App\Shipping;

class ProductController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index()
    {

        $products = Product::orderBy('views', 'desc')->take(9)->get();

        return response()->json($products);
    }

    /**
    * Display result of search.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function house(Request $request){

        $houses = Product::where('type', 'like', 'house')->orderBy('views', 'desc')->take(9)->get();

        return response()->json($houses);
    }

    /**
    * Display result of search.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function searchResult(Request $request)
    {
        $search = $request->odd;
        $products = Product::where('title', 'like', '%'.$search.'%')
                            ->orWhere('description', 'like', '%'.$search.'%')
                            ->orderBy('views','desc')
                            ->get();

        return response()->json($products);
    }

    /**
    * Display result of search.
    *
    * @return \Illuminate\Http\Response
    */
    public function categoryPro()
    {
        $products = Product::where('category', 'pro')->get();

        return response()->json($products);
    }

    /**
    * Display result of search.
    *
    * @return \Illuminate\Http\Response
    */
    public function categoryPrivate()
    {
        $products = Product::where('category', 'private')->get();

        return response()->json($products);
    }

    /**
    * Display result of search.
    *
    * @return \Illuminate\Http\Response
    */
    public function getAllProducts()
    {
        $products = Product::all();
        $shipping = Shipping::all();
        return response()->json(['products' => $products,'shipping'=>$shipping]);
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    {
        if($request->get('image'))
        {
           $image = $request->get('image');
           $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
           $img = \Image::make($request->get('image'))->save(public_path('images/').$name);
         }

        $product = new Product([
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'price' => $request->get('price'),
            'category' => $request->get('category'),
            'stock' => $request->get('stock'),
            'filename' => $name
            ]);

            $product->save();


            return response()->json('Product Added Successfully.');
    }

        /**
        * Display the specified resource.
        *
        * @param  int  $id
        * @return \Illuminate\Http\Response
        */
        public function show($id)
        {

            $product = Product::where('id', $id)->first();
            $product->increment('views');

            return response()->json($product);
        }

        /**
        * Update the specified resource in storage.
        *
        * @param  \Illuminate\Http\Request  $request
        * @param  int  $id
        * @return \Illuminate\Http\Response
        */
        public function update(Request $request, $id)
        {
            $product = Product::find($id);
            $product->stock = $request->get('stock');
            $product->price = $request->get('price');
            $product->category = $request->get('category');


            $product->save();

            return response()->json('Product Updated Successfully.');
        }

        /**
        * Remove the specified resource from storage.
        *
        * @param  int  $id
        * @return \Illuminate\Http\Response
        */
        public function destroy($id)
        {
            $product = Product::find($id)->first();
            $product->delete();
            return response()->json('Product Deleted Successfully.');
        }

        public function updateProductSale(Request $request, $id)
        {
            $product = Product::find($id);
            $decution = $product->price * $request->get('discount') / 100;

            $product->sale = $request->get('sale');
            $product->discount = $request->get('discount');
            $product->saleprice = $product->price - $decution;
            $product->save();

            return response()->json('Product Updated Successfully.');
        }
    }
