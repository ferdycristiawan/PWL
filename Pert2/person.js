const person = () => {
    return {
        nama: "Andy",
        telepon: 921419024,
    };
};

const info = person();
const {nama, telepon} = info;


export default person;