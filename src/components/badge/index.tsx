interface BadgePropsType {
  count: number;
}

const Badge = ({count}: BadgePropsType) => {
  return (
    <div className="text-center font-semibold" style={{fontSize:'10px'}}>{count > 99 ? '+99' : count}</div>
  );
};

export default Badge;
