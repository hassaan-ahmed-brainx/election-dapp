import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  candidates: [],
  selectedCandidate: '',
  voteCount: 0,
};

const castAVoteSlice = createSlice({
  name: 'castAVote',
  initialState,
  reducers: {
    setCandidates: (state, action) => {
      state.candidates = action.payload;
    },
    setSelectedCandidate: (state, action) => {
      state.selectedCandidate = action.payload;
    },
    setVoteCount: (state, action) => {
      state.voteCount = action.payload;
    },
  },
});

export const { setCandidates, setSelectedCandidate, setVoteCount } = castAVoteSlice.actions;

export default castAVoteSlice.reducer;
