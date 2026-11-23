function Chip({ name, options = [], value = [], onChange }) {
  function toggleOption(optionValue) {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  }

  return (
    <div>
      <div
        className="combobox-control d-flex flex-wrap gap-1 p-2 bg-white rounded-4 m-1"
        data-bs-toggle="combobox"
        data-bs-name={name}
        data-bs-multiple="true"
      >
      </div>
      <div className="menu d-flex flex-wrap gap-1 m-1" aria-label={name}>
        {options.map((option) => {
          const selecionado = value.includes(option.value);
          return (
            <button
              key={option.value}
              className={`btn btn-sm rounded-pill ${
                selecionado ? 'btn-primary' : 'btn-outline-light'
              }`}
              type="button"
              onClick={() => toggleOption(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Chip;