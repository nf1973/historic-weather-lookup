const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-48 overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
