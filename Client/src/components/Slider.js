import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
    return (
        <Carousel variant="dark">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    width={200}
                    height={300}
                    src="https://media.istockphoto.com/id/854725372/pt/foto/healthy-food-clean-eating-selection.jpg?s=170667a&w=0&k=20&c=6ehI5Jry8Xk3inc5slKNNW-JybYbXpwSPW6sYRAY68U="
                    alt="Fist slide"
                />
                <Carousel.Caption>
                    <h5 className='text-white'>Phát Nông</h5>
                    <p className="text-white">
                        Cam kết gia hàng tận nơi, đúng giá, đúng sản phẩm.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    width={200}
                    height={300}
                    src="https://www.brmc.org.au/wp-content/uploads/2020/05/Fresh-Fruit-and-Vegetables.png"
                    alt="Second slide"
                />
                <Carousel.Caption>
                <h5 className='text-white'>Phát Nông</h5>
                    <p className="text-white">
                        Cam kết đầy đủ các chất liệu, mẫu mã các bạn yêu cầu.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    width={200}
                    height={300}
                    src="https://msmobile.com.vn/upload_images/images/tai-hinh-nen-3d-dep-nhat-6.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                <h5 className='text-white'>Phát Nông</h5>
                    <p className="text-white">
                        Cam kết sản phẩm thời thượng, hot nhất trên thị trường.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default DarkVariantExample;