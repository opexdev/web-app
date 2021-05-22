  import classes from "./ShimmerEffect.module.css";

const ShimmerEffect = (props) => {
  if (props.circle) {
    return <div className={`${classes.circle} ${classes.shimmer}`} />;
  }
  return <div className={classes.shimmer} />;
};
export default ShimmerEffect;
