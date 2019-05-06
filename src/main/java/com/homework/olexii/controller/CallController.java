package com.homework.olexii.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;
import java.time.LocalDate;

@RestController
@RequestMapping("fill")
public class CallController {

    @GetMapping
    public int[] hi(@RequestParam(value = "year") int year, @RequestParam(value = "month") int month) {
        int firstDay = getDayOfWeek(year, month);
        int [] countOfDays = getDaysInMonths(year, month);
        int[] result = new int[3];
        result[0] = firstDay;
        result[1] = countOfDays[0];
        result[2] = countOfDays[1];
        return result;
    }

    public int[] getDaysInMonths(int year, int month) {
        LocalDate date = LocalDate.of(year, month, 01);
        LocalDate date1;
        if (month == 1) {
             date1 = LocalDate.of(year, 12, 01);
        } else {
             date1 = LocalDate.of(year, month - 1, 01);
        }
        int currentMonth;
        int previousMonth;
        if (year % 4 == 0) {
            currentMonth = date.getMonth().length(true);
            previousMonth = date1.getMonth().length(true);
        } else {
            currentMonth = date.getMonth().length(false);
            previousMonth = date1.getMonth().length(false);
        }
        int [] result = {currentMonth,previousMonth};
        return result;
    }

    public int getDayOfWeek(int year, int month) {
        LocalDate date = LocalDate.of(year, month, 01);
        DayOfWeek day = date.getDayOfWeek();

        switch (day) {
            case MONDAY:
                return 1;
            case TUESDAY:
                return 2;
            case WEDNESDAY:
                return 3;
            case THURSDAY:
                return 4;
            case FRIDAY:
                return 5;
            case SATURDAY:
                return 6;
            default:
                return 7;
        }
    }
}
