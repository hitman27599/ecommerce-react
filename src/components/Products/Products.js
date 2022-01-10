import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

// const products =[
//     {id:1,name:"chessBoard" ,description:"kids foldable chessboard used for tournaments", price:'$5', image:'http://www.gettyimages.in/detail/1229741317'},
//     {id:2, name:"chessClock" ,description:"Chess clock timer used in professional tournaments", price:'$10' , image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.worldchesspieces.com%2Fbest-chess-clocks%2F&psig=AOvVaw3X_XjQW-WVo0AgSgpP8ULY&ust=1641742933414000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNj12pa_ovUCFQAAAAAdAAAAABAD'} 
// ];

const Products = ({products, onAddToCart}) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key ={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;