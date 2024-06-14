import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class UniqueRandomNumbers {
    public static void main(String[] args) {
        Random rand = new Random();
        
        int rows = 200;
        int columns = 3;
        int[][] randomData = new int[rows][columns];

        for (int i = 0; i < rows; i++) {
            Set<Integer> uniqueNumbers = new HashSet<>();
            while (uniqueNumbers.size() < columns) {
                int randomNumber = rand.nextInt(50) + 1;
                uniqueNumbers.add(randomNumber);
            }

            int index = 0;
            for (int number : uniqueNumbers) {
                randomData[i][index++] = number;
            }
        }

        // Print the generated data
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                System.out.print(randomData[i][j] + " ");
            }
            System.out.println();
        }
    }
}

