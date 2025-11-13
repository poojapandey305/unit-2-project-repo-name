
package com.urbanspice.config;

import com.urbanspice.model.MenuItem;
import com.urbanspice.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class MenuDataLoader {

    @Bean
    CommandLineRunner initDatabase(MenuItemRepository menuRepo) {
        return args -> {

            // to insert data if the table is empty
            if (menuRepo.count() == 0) {

                List<MenuItem> items = List.of(
                        new MenuItem("Samosa", 7.0, "breakfast", "/images/SAMOSA.B.jfif"),
                        new MenuItem("Dhokla Jalebi", 5.0, "breakfast", "/images/Dhokla.jalebiB.jfif"),
                        new MenuItem("Cutlet", 7.0, "breakfast", "/images/Cutlet.B.jfif"),
                        new MenuItem("Pakora-chai", 5.0, "breakfast", "/images/Pakora_Chai.B.jfif"),

                        new MenuItem("Aaloo Paratha", 12.0, "lunch", "/images/AaluParatha.l.jfif"),
                        new MenuItem("Idli Sambhar", 15.0, "lunch", "/images/Idli.lunch.jfif"),
                        new MenuItem("Kadhi Chawal", 12.0, "lunch", "/images/KadhiChawal.l.jfif"),
                        new MenuItem("Puri Chhole", 15.0, "lunch", "/images/PuriChhole.l.jfif"),

                        new MenuItem("Masala Dosa", 10.0, "dinner", "/images/Dosa.D.jfif"),
                        new MenuItem("Palak Paneer", 8.0, "dinner", "/images/PalakPaner.D.jfif"),
                        new MenuItem("Pav Bhaji", 5.0, "dinner", "/images/Pavbhaji.D.jfif"),
                        new MenuItem("Sabudana Khichdi", 15.0, "dinner", "/images/SabudanaKhichdi.D.jfif")
                );

                menuRepo.saveAll(items);
                System.out.println("Menu items loaded successfully into the database!");
            } else {
                System.out.println("Menu items already exist — skipping data load.");
            }
        };
    }
}