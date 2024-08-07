export const getMarkup = (email: string, message: string) => {
  return `
    <div><bold>From:</bold> ${email}</div>
<br />
<div><bold>Message:</bold> ${message}</div>
`;
};
