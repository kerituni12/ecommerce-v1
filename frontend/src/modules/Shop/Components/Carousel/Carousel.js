import React, { Component } from "react";
import Slider from "react-slick";
import styles from "./carousel.module.scss";
import Link from "next/link";
import { Container, Toolbar } from "@material-ui/core";
export default class Responsive extends Component {
  render() {
    const settings = {
      dots: true,
      dotsClass: styles.buttonBar,
      infinite: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <Container>
        <div position="static" className={styles.appbarCategories}>
          <Toolbar variant="dense">
            <h4 className={styles.nameCategoriesWrap}> DANH MỤC SẢN PHẨM </h4>
          </Toolbar>
          <div style={{ backgroundColor: "rgb(0, 172, 193)", width: 200, height: 2 }}>.</div>
        </div>

        <Slider {...settings}>
          <Link href={{ pathname: "/" + "Thời Trang" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/dd/51/92/e6bc22b5ec0d6d965a93f056b7776493.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Thời Trang</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Sắc Đẹp" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/85/13/02/d8e5cd75fd88862d0f5f647e054b2205.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Sắc Đẹp</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Thiết Bị Điện Tử" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/94/6a/42/3b262c87f2fd104b7cb50f38aef43e18.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Thiết Bị Điện Tử</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Hàng Quốc Tế" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/9d/ba/6f/0c85993f0436f73cdfbababda1dc5595.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Hàng Quốc Tế</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Điện Tử - Điện Lạnh" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/70/52/b1/31587960ac1eb915a86a5a8202da583a.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Điện Tử - Điện Lạnh</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Thể Thao - Dã Ngoại" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="  https://salt.tikicdn.com/ts/category/90/78/11/b8a67fe010361551e515fdcca7709f69.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Thể Thao - Dã Ngoại</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Đồ Chơi Mẹ Và Bé" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/66/15/4f/6282e8c6655cb87cb226e3b701bb9137.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Đồ Chơi Mẹ Và Bé</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Máy Ảnh" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/c3/a4/87/4584c6298920124cb7da51de157ddac9.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Máy Ảnh</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Điện Gia Dụng" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/b3/2b/72/8e7b4b703653050ffc79efc8ee017bd0.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Điện Gia Dụng</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Bách Hoá" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/bd/9f/56/830a6a075c7cd78737a1d0c58e11926d.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Bách Hoá</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Thiết Bị Số" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/85/b8/4e/bda4f4c039daa5bb8e6ecdccd7875b08.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Thiết Bị Số</div>
            </div>
          </Link>
          <Link href={{ pathname: "/" + "Nhà Cửa - Đời Sống" }}>
            <div className={styles.imageCategoriesWrap}>
              <img
                src="https://salt.tikicdn.com/ts/category/12/29/a2/7409ff03cff5c0d3d695cb19f8f15896.png"
                className={styles.imageCategories}
              />
              <div className={styles.titleCategories}>Nhà Cửa - Đời Sống</div>
            </div>
          </Link>
        </Slider>
      </Container>
    );
  }
}
