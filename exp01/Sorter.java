package exp01;

interface Sorter<T extends Comparable<T>> {
	
	void sort(T[] items);
	
}
