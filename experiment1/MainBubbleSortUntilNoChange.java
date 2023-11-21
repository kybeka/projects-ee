import java.util.*;
import exp01.*;

public class MainBubbleSortUntilNoChange {
    public static void main(String[] args) {
        int it = 15;
        int n = 10;
        // int n = 100;
        // int n = 1000;
        //int n = 10000;

        long startTime = 0;
        long stopTime = 0;

        for (int i = 0; i < it; i++) {
            Integer[] randomInteger = randomInteger(n);
            //Integer[] sortedInteger = sortedInteger(n);
            // Integer[] reversedInteger = reversedInteger(n);
            startTime = System.nanoTime();
            new BubbleSortUntilNoChange<Integer>().sort(randomInteger);
            stopTime = System.nanoTime();
            System.out.println((stopTime - startTime));
        }
    }

    public static Integer[] randomInteger(int n) {
        ArrayList<Integer> list = new ArrayList<>(n);
        Random random = new Random();
        for (int i = 0; i < n; i++) {
            list.add(random.nextInt(n));
        }
        Integer[] array = new Integer[list.size()];
        array = list.toArray(array);
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
