export default function CustomerAutocomplete({
  searchSuggestion = [],
  setSearchSuggestion,
  setCustomerData,
}) {
  return (
    <>
      {searchSuggestion.length > 0 && (
        <div className='dropdown-menu'>
          {searchSuggestion.map((customer) => (
            <div
              key={customer.id}
              className='dropdown-item'
              onClick={() => {
                setCustomerData((prevData) => ({
                  ...prevData,
                  name: customer.name,
                  address: customer.address,
                  phone: customer.phone,
                  afm: customer.afm,
                }));

                setSearchSuggestion([]);
              }}
            >
              {customer.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
}