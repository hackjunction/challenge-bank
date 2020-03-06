import React from "react";

import { Tag } from "antd";

const CategoryBadge = ({ category }) => {
  if (!category) return null;
  return <Tag color={category.color}>{category.name}</Tag>;
};

export default CategoryBadge;
