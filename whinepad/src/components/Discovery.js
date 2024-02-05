import Excel from "./Excel";

export default function Discovery() {
    return (
        <Excel 
            headers={['Name', 'Year']}
            initialData={[
                ['Chales', '1859'],
                ['Antoine', '1943'],
            ]}
        />  
    );
}