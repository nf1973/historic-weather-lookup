const Card = ({ children, cardHeightClassName = "h-48", cardTitle = null }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 overflow-hidden ${cardHeightClassName}`}
    >
      {cardTitle && <h2 className="text-xl font-bold mb-4">{cardTitle}</h2>}
      {children}
    </div>
  );
};

export default Card;
