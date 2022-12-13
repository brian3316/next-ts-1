import Head from "next/head";
import Link from "next/link";
import { CSSProperties } from "react";
import styles from "../../styles/Home.module.css";

interface InnerProps {
  products: any[];
}

export default function index({ products }: InnerProps) {
  // https://fakestoreapi.com/products
//   console.log("products:", products);
  const Product = ({ id,title }: any) => (
    <div>
      <h1>{id} {title}</h1>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Link href="/">HOME</Link>
      </h1>
      {products.length > 0
        ? products.map((product) => (
            <Product key={product.id} id={product.id} title={product.title}></Product>
          ))
        : null}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  // console.log("products:",res.data);
  return {
    props: {
      products: data,
    },
  };
}
