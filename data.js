import bcrypt from "bcryptjs";

const data = {
    users: [{
            phone: "+918899889989",
            pass: bcrypt.hashSync("1234", 8),
            isAdmin: false,
        },
        {
            phone: "+918899877898",
            pass: bcrypt.hashSync("12345", 8),
            isAdmin: true,
        },
        {
            phone: "+717899889989",
            pass: bcrypt.hashSync("123456", 8),
            isAdmin: false,
        }
    ]
};

export default data;