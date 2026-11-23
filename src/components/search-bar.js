import TextField from '@mui/material/TextField';

function SearchBar({ label }) {
    return (
        <TextField
          id="search"
          label={`${label}`}
          type="search"
          variant="outlined"
          color='black'
          fullWidth
        />
    )
}

export default SearchBar;