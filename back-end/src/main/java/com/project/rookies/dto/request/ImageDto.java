package com.project.rookies.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ImageDto {
    @NotBlank(message = "image url is require")
    private String imageURL;
}
