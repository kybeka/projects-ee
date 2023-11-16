
import java.util.*;
import exp01.*;

public class MainBubbleSortPassPerItem {
    public static void main(String[] args) {
        // int n = 10;
        // int n = 100;
        // int n = 1000;
        int n = 10000;

        // Integer[] randomInteger = randomInteger(n);
        Integer[] sortedInteger = sortedInteger(n);
        // Integer[] reversedInteger = reversedInteger(n);

        long startTime = 0;
        long stopTime = 0;

        startTime = System.nanoTime();
        for (int i = 0; i < n; i++) {
            // new BubbleSortWhileNeeded<Integer>().sort(integers);
            new BubbleSortUntilNoChange<Integer>().sort(sortedInteger);
            // System.out.println((stopTime - startTime));
            // System.out.println("["+ i +"]" + " ns " + ": " + (stopTime - startTime));
        }
        stopTime = System.nanoTime();

        System.out.println("Total time to sort " + n + " elements: " + (stopTime - startTime) + " nanoseconds");
    }

    public static Integer[] randomInteger(int n) {
        ArrayList<Integer> list = new ArrayList<>(n);
        Random random = new Random();
        for (int i = 0; i < n; i++) {
            list.add(random.nextInt(n));
        }
        Integer[] array = new Integer[list.size()];
        array = list.toArray(array);
        // System.out.println(Arrays.toString(array));
        return array;
    }

    public static Integer[] sortedInteger(int n) {
        Integer[] integers = randomInteger(n);
        Arrays.sort(integers);
        return integers;
    }

    public static Integer[] reversedInteger(int n) {
        Integer[] integers = randomInteger(n);
        Arrays.sort(integers, Collections.reverseOrder());
        return integers;
    }
}
