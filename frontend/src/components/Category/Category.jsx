import React from "react";
import { categoryImage } from "./categoryFullInfos.js";
import CategoryCard from "./CategoryCard.jsx";
import classes from "./category.module.css";
function Category() {
  return (
    <div>
      <section className={classes.category_container}>
        {categoryImage.map((infos) => (
          <CategoryCard key={infos.name} data={infos} />
        ))}
      </section>
    </div>
  );
}

export default Category;
