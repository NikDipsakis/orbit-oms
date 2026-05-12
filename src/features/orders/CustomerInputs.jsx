import CustomerAutocomplete from './CustomerAutocomplete.jsx';

export default function CustomerInputs({
  data,
  changeHandler,
  searchSuggestion,
  setSearchSuggestion,
  setCustomerData,
  handleSuggestionEnter
}) {
  return (
    <section>
      <div className='dropdown'>
        <input
          name='name'
          type='text'
          placeholder='Customer'
          value={data.name}
          onChange={changeHandler}
          onKeyDown={handleSuggestionEnter}
        />
        <CustomerAutocomplete
          customerData={data}
          changeHandler={changeHandler}
          searchSuggestion={searchSuggestion}
          setSearchSuggestion={setSearchSuggestion}
          setCustomerData={setCustomerData}
        />
      </div>
      <input
        name='address'
        type='text'
        placeholder='Address'
        value={data.address}
        onChange={changeHandler}
      />

      <input
        name='deliveryDate'
        type='date'
        value={data.deliveryDate}
        onChange={changeHandler}
      />

      <input
        name='storeType'
        type='text'
        placeholder='Store Type'
        value={data.storeType}
        onChange={changeHandler}
      />

      <input
        name='phone'
        type='text'
        placeholder='Phone'
        value={data.phone}
        onChange={changeHandler}
      />

      <input
        name='mobile'
        type='text'
        placeholder='Mobile'
        value={data.mobile}
        onChange={changeHandler}
      />

      <input
        name='ownerName'
        type='text'
        placeholder='Owner Name'
        value={data.ownerName}
        onChange={changeHandler}
      />

      <input
        name='afm'
        type='text'
        placeholder='AFM'
        value={data.afm}
        onChange={changeHandler}
        onKeyDown={handleSuggestionEnter}
      />

      <textarea
        name='comments'
        placeholder='Comments'
        value={data.comments}
        onChange={changeHandler}
      />
    </section>
  );
}
