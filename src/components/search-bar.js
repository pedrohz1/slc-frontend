import TextField from '@mui/material/TextField';

function SearchBar({ label, onSearch }) {
    const mudar = (e) => {
        const novoValor = e.target.value;

        onSearch(novoValor);
    };

    return (
        <TextField
          id="search"
          label={`${label}`}
          onChange={mudar}
          type="search"
          variant="outlined"
          color='black'
          fullWidth
        />
    )
}

export default SearchBar;