package com.pitpat.pitterpatter.domain.assets.model.dto.item;

import com.pitpat.pitterpatter.entity.enums.ItemType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateItemDto {
    @NotNull
    private String itemName;
    @NotNull
    private int price;

    @NotNull
    private String photo;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ItemType itemType;

    @NotNull
    private String category;

    public CreateItemDto(String itemName, int price, String photo, ItemType itemType, String category) {
        this.itemName = itemName;
        this.price = price;
        this.photo = photo;
        this.itemType = itemType;
        this.category = category;
    }
}
