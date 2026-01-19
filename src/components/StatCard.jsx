const StatCard = ({ label, value }) => {
  return (
    <div className="bg-white/10 rounded-md flex-1 p-3">
      {label}
      <h2>{value}</h2>
    </div>
  );
};

export default StatCard;
