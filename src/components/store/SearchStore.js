import { create } from 'zustand';

const useSearchStore = create((set) => ({
  SearchLabel : "All Task : ",
  SearchObj: {
    todayTask: false,
    allTask: true,
    important: false,
    completed: false,
    pending: false,
    directory: null,
    search : null
  },
  updateSearchLabel: (label) =>set((state) =>{
    return {...state , SearchLabel: label};
  }),
  updateSearchObj: (task) => set((state) => {
    return {...state , SearchObj: task };
  })
}));

export default useSearchStore;
