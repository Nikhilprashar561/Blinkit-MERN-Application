const verifyEmailTemplates = ({ name, url }) => {
  return `

    <p>Dear ${name}</p>
    <p>Thank you for Registering Blinkit</p>
    <a href=${url} >Verify Eamil</a>

    `;
};

export { verifyEmailTemplates };
