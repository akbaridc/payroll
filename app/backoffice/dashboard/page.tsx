export default function Dashboard() {
    const array = new Array(500).fill(null); // Contoh array yang memiliki 500 elemen

    return (
        <div>
            {array.map((_, index) => (
                <div key={index}>aku adalah {index}</div>
            ))}
        </div>
    );
}
