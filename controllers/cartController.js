import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Product from "../models/Product.js";

//* Get the cart data:

export async function getCartData(req, res) {
  const { userId } = req.params; //destructure the user id from the URL
  try {
    const user = await User.findById(userId).populate({
      //Find the products in car from that user id
      path: "cart.productId",
      select: "name image price",
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `User does not exist.`,
      });
    }
    // console.log("This is the user cart from getCart(): ", user.cart);
    res.status(StatusCodes.OK).json(user.cart); //Give me the cart of that user
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Server Error`,
    });
  }
}

//* Adding products to the cart:

export async function addToCart(req, res) {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found." });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product does not exist." });
    }

    const itemInCart = user.cart.find((item) =>
      item.productId.equals(productId)
    );

    if (itemInCart) {
      itemInCart.quantity += quantity;
    } else {
      user.cart.push({
        productId,
        quantity,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        productCategory: product.category,
      });
    }

    await user.save();

    res.status(StatusCodes.OK).json(user.cart);
    console.log(product);
    console.log(user.cart);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

export async function removeFromCart(req, res) {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found." });
    }

    const deleteFromCart = user.cart.find(item => item.productId.toString() === productId)
  
    if (!deleteFromCart) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    } else {
      user.cart = user.cart.filter(
        (item) => !item.productId.equals(productId)
      );
    }

    await user.save()
   
    res.status(StatusCodes.OK).json(user );
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
}
