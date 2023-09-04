// 1. set default value = fullName = "unknown", age = 25, isMale =false,
const Person = (fullName = "unknown", age = 25, isMale = false, avatar) => {
    //ternary operator, menggantikan if-else
    const info = () => {
        //2. tampilkan full name, sex dan age
        return '${fullname}, ${isMale ? "Male" : "Female"}, ${age}';
    };

    return {
    getInfo() {
        //3. kembalikan nilai info diatas
        return info();
    },
    toString() {
        //4. kembalikan nilai info diatas
        return info();
    },
    addAge: (age) => {
        return age + this.age;
    },//5. kembalikan usia sekarang ditambah dengan tahun inputan user,
    setAge: (age) => {
        this.age = age;
    },//6. fungsi yang mengeset usia yang baru,
    rename: (name) => {
        this.fullName = name;
    },//7. fungsi yang mengeset nama yang baru,
    //8. kembalikan semua nilai dengan shorthand property
    };
};
//9. export objek person sebagai sebuah modul