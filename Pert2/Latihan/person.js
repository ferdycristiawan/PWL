// 1. set default value = fullName = "unknown", age = 25, isMale = false,
const Person = (fullName = "unknown", age = 25, isMale = false, avatar) => {
    // ternary operator, menggantikan if-else
    const info = () => {
        // 2. tampilkan full name, sex dan age
        return `${fullName}, ${isMale ? "Male" : "Female"}, ${age}`;
    };

    return {
        get getInfo() {
            // 3. kembalikan nilai info diatas
            return info();
        },
        toString() {
            // 4. kembalikan nilai info diatas
            return info();
        },
        // 5. kembalikan usia sekarang ditambah dengan tahun inputan user
        addAge(ageToAdd) {
            this.age += ageToAdd;
        },
        // 6. fungsi yang mengeset usia yang baru
        setAge(ageToSet) {
            if (ageToSet >= 0) {
                this.age = ageToSet;
            }
        },
        // 7. fungsi yang mengeset nama yang baru
        rename(nameToSet) {
            this.fullName = nameToSet;
        },
        // 8. kembalikan semua nilai dengan shorthand property
        fullName,
        age,
        isMale,
        avatar,

    };
};
// 9. export objek person sebagai sebuah modul
export default Person;
