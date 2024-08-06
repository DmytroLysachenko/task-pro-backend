export const createTicketManager = () => {
  let ticketNumber = 0;

  const increaseTicket = () => {
    return ++ticketNumber;
  };

  const getTicket = () => {
    return ticketNumber;
  };

  return { increaseTicket, getTicket };
};
